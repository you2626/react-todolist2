import React, { ChangeEvent } from "react";

interface InputFormProps {
    todoTitle: string;
    handleAddFormChanges: (e: ChangeEvent<HTMLInputElement>) => void;
    handleAddTodo: () => void;
}

    const InputForm: React.FC<InputFormProps> =(props)=>{
    const {todoTitle,handleAddFormChanges,handleAddTodo}=props;

    

    return (
        <div>
            <input
            type="text"
            value={todoTitle}
            onChange={handleAddFormChanges}
            />
            <button onClick={handleAddTodo}>作成</button>           
        </div>
    );
};

export default InputForm;