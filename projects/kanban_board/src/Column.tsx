import { FC, PropsWithChildren, useRef } from 'react';
import { ColumnContainer, ColumnTitle } from './styles';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './state/AppStateContext';
import { Card } from './Card';
import { addTask, moveList, moveTask, setDraggedItem } from './state/actions';
import { useItemDrag } from './utils/useItemDrag';
import {useDrop} from 'react-dnd'
import { isHidden } from './utils/isHidden';
import { DragItem } from './DragItem';

type ColumnProps = PropsWithChildren<{ text: string; id: string, isPreview?: boolean }>;

export const Column: FC<ColumnProps> = ({ id, text, isPreview }) => {
  const { getTasksByListId, dispatch, draggedItem } = useAppState();
  const tasks = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);
  const {drag} = useItemDrag({type: 'COLUMN', id, text});
  const [, drop] = useDrop({
    accept: ['COLUMN', 'CARD'],
    hover() {
      if(!draggedItem) { return; }
      if(draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) { return; }
        dispatch(moveList(draggedItem.id, id))
      }else {
        if(draggedItem.columnId === id) {return;}
        if(tasks.length) {return;}
        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id))
        dispatch(setDraggedItem({...draggedItem, columnId: id}))
      }
    }
  })

  drag(drop(ref));

  return (
    <ColumnContainer isPreview={isPreview} ref={ref} isHidden={isHidden(draggedItem, 'COLUMN', id, isPreview)}>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => <Card columnId={id} text={task.text} key={task.id} id={task.id} />)}
      <AddNewItem dark toggleButtonText='+ Add another task' onAdd={(text) => dispatch(addTask(text, id))} />
    </ColumnContainer>
  );
};
