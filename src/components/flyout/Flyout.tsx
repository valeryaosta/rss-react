import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { unselectAll } from '../../store/slices/characterSlice';
import { saveAs } from 'file-saver';
import './Flyout.css';

const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.characters.selectedItems);

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Id,Name,Status,Species,Gender,Origin,Last Known Location,Details URL\n' +
      selectedItems
        .map(
          (item) =>
            `Id: ${item.id}, Name: ${item.name}, Status: ${item.status}, Species: ${item.species}, Gender: ${item.gender}, Origin: ${item.origin.name}, Last Known Location: ${item.location.name}, Details URL: ${item.url}`,
        )
        .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedItems.length}_characters.csv`);
  };
  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className='flyout'>
      <p>{selectedItems.length} item(s) selected</p>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
