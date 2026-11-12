import img1 from "figma:asset/e972d80191832bca2ed73812be0c4911fdb526e8.png";

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[648px] left-0 top-0 w-[585px]" data-name="1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[195.37%] left-0 max-w-none top-[-43.06%] w-full" src={img1} />
        </div>
      </div>
    </div>
  );
}