// React import removed - JSX transform handles it
import { ProofDropzone } from './ProofDropzone';

export default {
  'Active Uploads': (
    <ProofDropzone
      label="Upload Proof Documents"
      helperText="PDF, PNG, JPG up to 15MB"
      onUploadComplete={(fileName) => {
        console.log(`Upload complete: ${fileName}`);
      }}
    />
  ),
  'Upload History': (
    <ProofDropzone
      label="Drop invoices, transcripts, or geotagged proof here"
      helperText="Supports PDF, PNG, JPG up to 15MB"
      extraMeta={{ source: 'geotagged-ticket-proof' }}
      onUploadComplete={(fileName, response) => {
        console.log(`Response for ${fileName}`, response);
      }}
    />
  ),
}