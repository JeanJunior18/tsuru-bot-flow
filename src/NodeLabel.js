export default function NodeLabel({ block }) {
  return (
    <div>
      <h4 className="block-title">{block.name}</h4>
      {block.messages.length ? (
        <div className="messages-container">
          {block.messages.map((message) => (
            <div className="message-container">
              <p>{message.message}</p>
              {message.options.map((option) => (
                <p>
                  {option.order} - {option.option}
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <>Sem mensagens configuradas :)</>
      )}
    </div>
  );
}
