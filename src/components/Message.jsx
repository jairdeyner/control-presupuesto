const Message = ({ children, typeMessage }) => {
  return <div className={`alerta ${typeMessage}`}>{children}</div>;
};
export default Message;
