import { useAppState } from './state/AppStateContext';
import { useDragLayer } from 'react-dnd';
import { CustomerDragLayerContainer, DragPreviewWrapper } from './styles';
import { Column } from './Column';
import { Card } from './Card';

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomerDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem.type === "COLUMN" ? 
				<Column id={draggedItem.id} text={draggedItem.text} isPreview /> : 
				<Card columnId={draggedItem.columnId} isPreview id={draggedItem.id} text={draggedItem.text} />}
      </DragPreviewWrapper>
    </CustomerDragLayerContainer>
  ) : null;
};
