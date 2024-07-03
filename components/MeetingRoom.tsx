import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { LayoutList } from "lucide-react";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [layout, setLayout] = useState("speaker-left");

  const [showParticipants, setShowParticipants] = useState(false);

  const call = useCall();

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-5 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => {
          call?.leave()
          setIsSetupComplete(false)
        }} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-full bg-zinc-700 transition-all size-[35px] flex items-center justify-center hover:brightness-75">
              <LayoutList size={15} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="bg-zinc-800 border border-zinc-700 text-white" align="end">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, i) => {
              return (
                <div key={i}>
                  <DropdownMenuItem onClick={() => setLayout(item.toLowerCase() as CallLayoutType)} className="cursor-pointer hover:brightness-75 transition-all">
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-zinc-600" />
                </div>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
};

export default MeetingRoom;
