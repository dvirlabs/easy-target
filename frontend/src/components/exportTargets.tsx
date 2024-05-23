import { Button } from 'react-bootstrap';
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
    <div className='export-targets'>
      <Button variant='success' onClick={handleExport}> Export Targets </Button>
    </div>
  );
};

export default ExportTargets;