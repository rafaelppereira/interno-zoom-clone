"use client";

import {
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, Mic, Video } from "lucide-react";
import { useRouter } from "next/navigation";

const MettingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const router = useRouter()

  const call = useCall();

  if (!call) {
    throw new Error("usecall must be used within StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="h-screen w-full text-white">
      <div className="max-w-6xl px-4 mx-auto flex h-full flex-col-reverse md:flex-row items-center justify-center gap-10">
        <div className="md:flex-[1.5]  w-full">
          <div className="relative">
            {isMicCamToggledOn ? (
              <div className="w-full aspect-video bg-zinc-800 rounded-md flex items-center justify-center">
                <h1 className="text-xl">Câmera desligada</h1>
              </div>
            ) : (
              <div
                className={
                  "rounded-md overflow-hidden border-4 border-zinc-700 !flip w-full"
                }
              >
                <VideoPreview className="rounded-md !w-full" />
              </div>
            )}

            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-2">
              <Button
                type="button"
                onClick={() => setIsMicCamToggledOn(!isMicCamToggledOn)}
                className={`${isMicCamToggledOn ? 'bg-red-500' : 'bg-zinc-800'} p-4 flex items-center gap-4 hover:brightness-75 transition-all`}
              >
                <Video className="size-5" />
                <Mic className="size-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="md:flex-1 ">
          <h1 className="text-xl font-bold">Pronto para participar?</h1>
          <p className="max-w-sm mt-1 text-zinc-400">
            Caso esteja pronto, clique em `Entrar na reunião` para iniciar sua vídeo chamada!
          </p>
          <div className="mt-6 flex items-center gap-3">
          <Button
              className="rounded-md bg-zinc-800 px-4 py-2.5 hover:brightness-75 transition-all"
              onClick={() => {
                router.push('/')
              }}
            >
              <ChevronLeft className="size-4" />
            </Button>

            <Button
              className="rounded-md bg-blue-1 px-4 py-2.5 hover:brightness-75 transition-all"
              onClick={() => {
                call.join();
                setIsSetupComplete(true);
              }}
            >
              Entrar na reunião
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MettingSetup;
