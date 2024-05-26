import { Button } from 'react-bootstrap';
import { CiExport } from "react-icons/ci";
import { exportTargets } from '../services/target.service';
import '../style/exportTargets.css';

const ExportTargets = () => {
  const handleExport = async () => {
    try {
      await exportTargets();
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  return (
    <div>
      <Button variant='success' onClick={handleExport}>
        <span className='export-icon'><CiExport /> | </span>
        Export Targets
      </Button>
    </div>
  );
};

export default ExportTargets;