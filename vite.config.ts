import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function inlineEntryForLocalFile() {
  return {
    name: 'inline-entry-for-local-file',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const htmlFile = bundle['index.html']
      if (!htmlFile || htmlFile.type !== 'asset') return
      let html = htmlFile.source.toString()
      const scriptMatch = html.match(
        /<script type="module"[^>]*\ssrc="([^"]+)"[^>]*><\/script>/,
      )
      if (!scriptMatch) return
      const scriptKey = scriptMatch[1].replace(/^\.\//, '')
      const script = bundle[scriptKey]
      if (!script || script.type !== 'chunk') return
      const code = script.code.replace(
        /new URL\((["'])(?!\.\/|\/|https?:)([^"']+)\1,\s*import\.meta\.url\)/g,
        'new URL($1./assets/$2$1, import.meta.url)',
      )
      html = html.replace(scriptMatch[0], () => `<script type="module">\n${code}\n</script>`)
      html = html.replace(
        /(<link\b[^>]*?)\s+crossorigin(?:="[^"]*")?/g,
        '$1',
      )
      htmlFile.source = html
      delete bundle[scriptKey]
    },
    writeBundle() {
      const htmlPath = path.resolve(__dirname, 'dist/index.html')
      const html = fs.readFileSync(htmlPath, 'utf8')
      const openTag = '<script type="module">'
      const start = html.indexOf(openTag)
      const end = html.lastIndexOf('</script>')
      if (start < 0 || end < start) return
      const body = html.slice(start + openTag.length, end).replace(
        /<\/script/gi,
        '\\u003c/script',
      )
      fs.writeFileSync(htmlPath, html.slice(0, start + openTag.length) + body + html.slice(end))
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    inlineEntryForLocalFile(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
