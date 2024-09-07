export const InputTodo=(props)=>{
    return (
        <div>
        <input
            type="text"
            label="タイトル"
            value={todoTitle}
            onChange={handleAddFormChanges}
          />
          <button onClick={handleAddTodo}>作成</button>
          </div>
    );
};