"use client"

import Image from "next/image"

const Maximize = () => {
  const handleMaximize = () => {
    const fullScreen = new KeyboardEvent("keypress", {
        key: "F11",
        code: "F11"
    });

    console.log(fullScreen);

    // trigger a fullscreen event
    const trigger = document.dispatchEvent(fullScreen);
    console.log(trigger)
  }

  return (
    <Image src='/maximize.png' alt='maximize' width={20} height={20} onClick={handleMaximize}/>
  )
}

export default Maximize