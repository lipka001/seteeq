import React from "react";
import Button from '@material-ui/core/Button';

function CrudButtons(props) {
    const { handleCreate, handleUpdate, handleDelete } = props;

    return (
        <div className="crud-btns">
          <Button className="crud-btn"
          variant="outlined"
          disableElevation
          onClick={handleCreate}>
          Создать
        </Button>
        <Button className="crud-btn"
          variant="outlined"
          color="primary"
          disableElevation
          onClick={handleUpdate}>
          Редактировать
        </Button>
        <Button className="crud-btn"
          variant="outlined"
          color="secondary"
          disableElevation
          onClick={handleDelete}>
          Удалить
        </Button>
      </div>
    )
}

export default CrudButtons;