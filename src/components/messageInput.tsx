import { useEffect, useRef } from "react";
import { IconButton } from "./iconButton";
import { AudioManager } from "./audioManager";
import Transcript from "./transcript";
import { useTranscriber } from "@/hooks/useTranscriber";



type Props = {
  userMessage: string;
  setUserMessage: (message: string) => void;
  isChatProcessing: boolean;
  onChangeUserMessage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onClickSendButton: () => void;
};
export const MessageInput = ({
  userMessage,
  setUserMessage,
  isChatProcessing,
  onChangeUserMessage,
  onClickSendButton,
}: Props) => {
  const transcriber = useTranscriber();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (transcriber.output) {
      setUserMessage(transcriber.output?.text);
    }
  }, [transcriber]);

  function send() {
    onClickSendButton();
    inputRef.current?.focus();
    setUserMessage("");
  }

  return (
    <div className="absolute bottom-0 z-20 w-screen">
      <div className="bg-base text-black">
        <div className="mx-auto max-w-4xl p-2">
          <div className="grid grid-flow-col grid-cols-[min-content_1fr_min-content] gap-[8px]">
            <AudioManager transcriber={transcriber} />

            <input
              type="text"
              ref={inputRef}
              placeholder="Write message here..."
              onChange={onChangeUserMessage}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  send();
                }
              }}
              disabled={false/*isChatProcessing*/}
              className="disabled w-full rounded-md bg-surface1 px-4 font-M_PLUS_2 font-bold text-text-primary typography-16 hover:bg-surface1-hover focus:bg-surface1 disabled:bg-surface1-disabled disabled:text-primary-disabled"
              value={userMessage}></input>
  
            <IconButton
              iconName="24/Send"
              className="bg-secondary hover:bg-secondary-hover active:bg-secondary-press disabled:bg-secondary-disabled"
              isProcessing={isChatProcessing}
              disabled={isChatProcessing || !userMessage}
              onClick={send}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
