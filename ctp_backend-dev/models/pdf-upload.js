import mongoose from 'mongoose'
import { HUDL_REPORT_TYPE, PDF_UPLOAD_STATUS } from './enums.js'

const pdfUploadSchema = new mongoose.Schema(
  {
    file_path: { type: String, required: true, trim: true },
    file_name: { type: String, required: true, trim: true },
    report_type: { type: String, required: true, enum: HUDL_REPORT_TYPE },
    status: { type: String, required: true, enum: PDF_UPLOAD_STATUS },
    parsed_payload: { type: mongoose.Schema.Types.Mixed, default: null },
    uploaded_by_admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null,
      index: true,
    },
    error_message: { type: String, default: null },
  },
  {
    collection: 'pdf_uploads',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

pdfUploadSchema.index({ status: 1 })

export function registerPdfUploadModel() {
  return mongoose.models.PdfUpload ?? mongoose.model('PdfUpload', pdfUploadSchema)
}
