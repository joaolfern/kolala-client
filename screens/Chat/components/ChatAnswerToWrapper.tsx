import type { ReactNode } from "react";
import { StyleSheet } from "react-native";

import ReplyPreview from "@/components/ReplyPreview/ReplyPreview";
import Span from "@/components/Span/Span";
import Colors from "@/constants/Colors";
import type { IMessage } from "@/Models/Message";

interface IProps {
  message: IMessage;
  children: ReactNode;
  isAuthor: boolean;
}

function ChatAnswerToWrapper({ children, message, isAuthor }: IProps) {
  if (message.answerToId)
    return (
      <Span style={styles.Container}>
        <ReplyPreview
          style={[
            styles.ReplyPreview,
            ...(isAuthor ? [] : [styles.ReplyPreviewNotAuthor]),
          ]}
          title={message.answerTo?.author?.name}
          content={message.answerTo?.content}
        />
        {children}
      </Span>
    );

  return <>{children}</>;
}

export default ChatAnswerToWrapper;

const styles = StyleSheet.create({
  Container: {},
  ReplyPreview: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 7,
  },
  ReplyPreviewNotAuthor: {
    backgroundColor: Colors.chatTextbox,
  },
});
