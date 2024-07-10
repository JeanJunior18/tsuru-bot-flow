import { Handle } from "reactflow";

export default function NodeLabel({ data, ...props }) {
  const { block } = data
  return (
    <div className="block-card">
      <Handle type="source" position="right" id="a" />
      <h4 className="block-title">{block.name}</h4>
      {block.messages.length ? (
        <div className="messages-container">
          {block.messages.map((message) => (
            <div key={message.id} className="message-container" >
              <p> {message.id} {message.message}</p>
              {message.options.map((option) => (
                <p key={option.id}>
                  {option.order} - {option.option}
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '0.5rem' }}>Sem mensagens configuradas :)</div>
      )}
      <Handle type="target" position="left" id="b" />
    </div>
  );
}
