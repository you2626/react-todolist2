import React, { ChangeEvent } from "react";

interface AddFormProps {
    newTitle: string;
    handleEditFormChanges: (e: ChangeEvent<HTMLInputElement>) => void;
    handleEditTodo: () => void;
    handleCloseEditForm: () => void;
}

    const AddForm: React.FC<AddFormProps> =(props)=>{
    const {newTitle,handleEditFormChanges,handleEditTodo,handleCloseEditForm}=props;

    

    return (
        <div>
            <input
            type="text"
            value={newTitle}
            onChange={handleEditFormChanges}
          />
          <button onClick={handleEditTodo}>編集を保存</button>
          <button onClick={handleCloseEditForm}>キャンセル</button>       
        </div>
    );
};

export default AddForm;