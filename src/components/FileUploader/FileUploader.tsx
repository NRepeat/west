import { useDropzone } from 'react-dropzone';
import { useState, useCallback } from 'react';

const FileUploader = () => {
	const [files, setFiles] = useState<File[]>([]);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setFiles((prev) => [...prev, ...acceptedFiles]);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { 'image/*': [] },
		onDrop,
	});

	return (
		<div>
			<p className="pb-2">Media</p>
			<div
				{...getRootProps()}
				className="flex flex-col gap-2 h-[100px] border-dotted border-2 border-gray-300 p-4 rounded-md hover:bg-gray-100/50"
			>
				<input {...getInputProps()} className="hidden" />
				<div className="w-full text-center cursor-pointer h-full flex items-center justify-center">
					{isDragActive ? (
						<p>Drop the files here ...</p>
					) : (
						<p>Drag 'n' drop some files here, or click to select files</p>
					)}
				</div>
			</div>

			<div className="mt-4 flex flex-wrap gap-2">
				{files.map((file) => (
					<div key={file.name} className="relative w-24 h-24 border rounded-md overflow-hidden">
						<img
							src={URL.createObjectURL(file)}
							alt={file.name}
							className="w-full h-full object-cover"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default FileUploader;
