import React from "react";

export default function Videos() {
  return (
    <div className="container mx-auto px-5 xl:px-0">
      <div className=" w-full lg:w-3/4 h-auto md:h-96 flex mx-auto justify-center">
        <iframe
          className="w-full h-full "
          // width="871"
          // height="474"
          src="https://www.youtube.com/embed/KL_nsjG1TUo?si=V5613Wb1McsizSZq"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
}
