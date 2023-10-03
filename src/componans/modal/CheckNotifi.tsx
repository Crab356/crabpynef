import { memo } from "react";

function CheckNotification({
  icon,
  message,
  colorBorder,
}: {
  colorBorder: string;
  icon: string;
  message: string;
}) {
  return (
    <>
      <div id="notifi__status" className="check_notif-box">
        <div className={colorBorder}>
          <i className={icon} style={{ display: "inline-block" }}></i>
          <p className="text_notifi-check">{message}</p>
        </div>
      </div>
    </>
  );
}

export default CheckNotification;
