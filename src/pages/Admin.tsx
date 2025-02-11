// import { Button } from '@/components/ui/button'
// import RVForm from '@/components/ui/form'
// import { FromInput } from '@/components/ui/form-input'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { useForm } from '@rvf/react'
// import { withZod } from '@rvf/zod'
// import { useCallback, useState } from 'react'
import z from 'zod'
// import { useDropzone } from 'react-dropzone'
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
// import { Check, ChevronsUpDown } from 'lucide-react'
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
// import clsx from 'clsx'

// const categories = [
// 	{
// 		value: "disk",
// 		label: "Disks",
// 	},

// ]
// const Admin = () => {
// 	const validator = withZod(z.object({
// 		title: z.string().min(3).max(255),
// 		description: z.string().min(3).max(255),
// 		// price: z.coerce.number().min(0),
// 		// images: z.array(z.string().url()),
// 		// width: z.coerce.number().min(3).max(255),
// 		// weight: z.coerce.number().min(3).max(255),
// 		// diameter: z.coerce.number().min(3).max(255),
// 		// et: z.coerce.number().min(3).max(255),
// 		// pcd: z.coerce.number().min(3).max(255),
// 		// color: z.string().min(3).max(255),
// 	}))
// 	const form = useForm({
// 		validator,
// 		defaultValues: {
// 			title: 'asd',
// 			description: 'asd',
// 			// price: 0,
// 			// images: [''],
// 			// thumbnail: '',
// 			// width: '',
// 			// weight: '',
// 			// diameter: '',
// 			// et: '',
// 			// pcd: '',
// 			// color: 'GREEN',
// 		},
// 		onBeforeSubmit: async (values) => {
// 			console.log("Before submit:", values);
// 		},
// 		handleSubmit: async (validatedData) => {
// 			console.log("Submitting data:", validatedData);
// 			// Тут нужно добавить логику отправки данных на сервер, например:
// 			// await fetch('/api/products', { method: 'POST', body: JSON.stringify(validatedData) })
// 		}

// 	})
// 	const handleSaveButton = () => {
// 		form.submit()
// 	}
// 	const variantForm = useForm({
// 		validator: withZod(z.object({
// 			description: z.string().min(3).max(255),
// 			slug: z.string().min(3).max(255),
// 			images: z.array(z.string().url()),
// 			thumbnail: z.string().url(),
// 			price: z.coerce.number().min(0),
// 			width: z.coerce.number().min(3).max(255),
// 			weight: z.coerce.number().min(3).max(255),
// 			diameter: z.coerce.number().min(3).max(255),
// 			et: z.coerce.number().min(3).max(255),
// 			pcd: z.coerce.number().min(3).max(255),
// 			color: z.string().min(3).max(255),
// 		}))
// 	})
// 	const [productVariants, setProductsVariants] = useState<{ index: number }[]>([])
// 	const handleAddVariant = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
// 		e.preventDefault()
// 		setProductsVariants([...productVariants, { index: productVariants.length }])
// 	}

// 	const [open, setOpen] = useState(false)
// 	const [value, setValue] = useState("")
// 	const [openCategory, setOpenCategory] = useState(false)
// 	const [categoryValue, setCategoryValue] = useState("")
// 	const [files, setFiles] = useState<File[]>([])
// 	const fileToBase64 = (file: File): Promise<string> => {
// 		return new Promise((resolve, reject) => {
// 			const reader = new FileReader();
// 			reader.readAsDataURL(file);
// 			reader.onload = () => resolve(reader.result as string);
// 			reader.onerror = reject;
// 		});
// 	};
// 	const onDrop = useCallback((acceptedFiles: File[]) => {
// 		setFiles((prev) => [...prev, ...acceptedFiles]);
// 		Promise.all(acceptedFiles.map(fileToBase64)).then((base64Images) => {
// 			form.setValue('images', [...form.value('images'), ...base64Images]);
// 		});
// 	}, [form]);
// 	const { getRootProps, getInputProps, isDragActive } = useDropzone({
// 		accept: { 'image/*': [] },
// 		onDrop,
// 	});
// 	const handleRemoveVariant = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, index: number) => {
// 		e.preventDefault()
// 		e.stopPropagation()
// 		setProductsVariants(productVariants.filter((_, i) => i !== index))
// 	}

// 	return (
// 		<div className='gap-2	flex flex-col'>

// 			<RVForm form={form} className='gap-2 flex	flex-col  bg-white p-4	rounded-md shadow-md'>
// 				{/* <FromInput name="title" label="Title" scope={form.scope('title')} />
// 				<FromInput name="description" label="Description" scope={form.scope('description')} /> */}
// 				{/* <div>
// 					<p className="pb-2">Media</p>
// 					<div
// 						{...getRootProps()}
// 						className="flex flex-col gap-2 h-[100px] border-dotted border-2 border-gray-300 p-4 rounded-md hover:bg-gray-100/50"
// 					>
// 						<input {...getInputProps()} className="hidden" />
// 						<div className="w-full text-center cursor-pointer h-full flex items-center justify-center">
// 							{isDragActive ? (
// 								<p>Drop the files here ...</p>
// 							) : (
// 								<p>Drag 'n' drop some files here, or click to select files</p>
// 							)}
// 						</div>
// 					</div>

// 					<div className="mt-4 flex flex-wrap gap-2">
// 						{files.map((file) => (
// 							<div key={file.name} className="relative w-24 h-24 border rounded-md overflow-hidden">
// 								<img
// 									src={URL.createObjectURL(file)}
// 									alt={file.name}
// 									className="w-full h-full object-cover"
// 								/>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 				<div>
// 					<p className='pb-2'>Category</p>
// 					<Popover open={openCategory} onOpenChange={setOpenCategory}>
// 						<PopoverTrigger asChild>
// 							<Button
// 								variant="outline"
// 								role="combobox"
// 								aria-expanded={openCategory}
// 								className="w-[200px] justify-between"
// 							>
// 								{categoryValue
// 									? categories.find((framework) => framework.value === categoryValue)?.label
// 									: "Select category..."}
// 								<ChevronsUpDown className="opacity-50" />
// 							</Button>
// 						</PopoverTrigger>
// 						<PopoverContent className="w-[200px] p-0">
// 							<Command>
// 								<CommandInput placeholder="Search framework..." className="h-9" />
// 								<CommandList>
// 									<CommandEmpty>No framework found.</CommandEmpty>
// 									<CommandGroup>
// 										{categories.map((framework) => (
// 											<CommandItem
// 												key={framework.value}
// 												value={framework.value}
// 												onSelect={(currentValue) => {
// 													setCategoryValue(currentValue === categoryValue ? "" : currentValue)
// 													setOpenCategory(false)
// 												}}
// 											>
// 												{framework.label}
// 												<Check
// 													className={clsx(
// 														"ml-auto",
// 														categoryValue === framework.value ? "opacity-100" : "opacity-0"
// 													)}
// 												/>
// 											</CommandItem>
// 										))}
// 									</CommandGroup>
// 								</CommandList>
// 							</Command>
// 						</PopoverContent>
// 					</Popover>
// 				</div> */}
// 				{/* <FromInput name="uuid" label="UUID" scope={form.scope('uuid')} type='hidden' islabelvisible={false} /> */}
// 			</RVForm>
// 			<div className='flex flex-col gap-2 bg-white p-4	rounded-md shadow-md'>
// 				<p className='pb-2 font-bold'>Pricing</p>
// 				<FromInput name="Price" label="Price" scope={variantForm.scope('price')} />
// 			</div>
// 			<div className='flex flex-col gap-2 bg-white p-4	rounded-md shadow-md'>
// 				<p className='pb-2 font-bold'>Inventory</p>
// 				<FromInput name="Quantity" label="Quantity" scope={variantForm.scope('quantity')} />
// 			</div>
// 			{/* <div className='flex flex-col gap-2 bg-white p-4	rounded-md shadow-md'>
// 				<p className='pb-2 font-bold'>Variants</p>
// 				<Tabs defaultValue="account" className="w-full">
// 					<Button onClick={(e) => handleAddVariant(e)}>Add Variant</Button>
// 					{productVariants.length > 0 && <TabsList >
// 						{productVariants.map((_, index) => (<TabsTrigger key={index} value={`${index}`}>Variant-{index} <span onClick={(e) => handleRemoveVariant(e, index)}>X</span> </TabsTrigger>))}
// 					</TabsList>}

// 					{productVariants.map((_, index) => (<TabsContent key={index} value={`${index}`} >
// 						<RVForm form={variantForm} >
// 							<div>
// 								<p className="pb-2">Media</p>
// 								<div  {...getRootProps()} className="flex flex-col gap-2 h-[100px] border-dotted border-2 border-gray-300 p-4 rounded-md hover:bg-gray-100/50">
// 									<input {...getInputProps()} className="hidden " />
// 									<div className="w-full text-center cursor-pointer h-full	flex items-center justify-center">
// 										{isDragActive ? (
// 											<p>Drop the files here ...</p>
// 										) : (
// 											<p>Drag 'n' drop some files here, or click to select files</p>
// 										)}
// 									</div>
// 								</div>
// 							</div>

// 							<FromInput name="price" label="Price" scope={variantForm.scope('price')} />
// 							<FromInput name="width" label="Width" scope={variantForm.scope('width')} />
// 							<FromInput name="weight" label="Weight" scope={variantForm.scope('weight')} />
// 							<FromInput name="diameter" label="Diameter" scope={variantForm.scope('diameter')} />
// 							<FromInput name="et" label="ET" scope={variantForm.scope('et')} />
// 							<FromInput name="pcd" label="PCD" scope={variantForm.scope('pcd')} />
// 							<div>
// 								<p className='pb-2'>Color</p>
// 								<Popover open={open} onOpenChange={setOpen}>
// 									<PopoverTrigger asChild>
// 										<Button
// 											variant="outline"
// 											role="combobox"
// 											aria-expanded={open}
// 											className="w-[200px] justify-between"
// 										>
// 											{value
// 												? categories.find((framework) => framework.value === value)?.label
// 												: "Select color..."}
// 											<ChevronsUpDown className="opacity-50" />
// 										</Button>
// 									</PopoverTrigger>
// 									<PopoverContent className="w-[200px] p-0">
// 										<Command>
// 											<CommandInput placeholder="Search framework..." className="h-9" />
// 											<CommandList>
// 												<CommandEmpty>No framework found.</CommandEmpty>
// 												<CommandGroup>
// 													{categories.map((framework) => (
// 														<CommandItem
// 															key={framework.value}
// 															value={framework.value}
// 															onSelect={(currentValue) => {
// 																setValue(currentValue === value ? "" : currentValue)
// 																setOpen(false)
// 															}}
// 														>
// 															{framework.label}
// 															<Check
// 																className={clsx(
// 																	"ml-auto",
// 																	value === framework.value ? "opacity-100" : "opacity-0"
// 																)}
// 															/>
// 														</CommandItem>
// 													))}
// 												</CommandGroup>
// 											</CommandList>
// 										</Command>
// 									</PopoverContent>
// 								</Popover>
// 							</div>
// 						</RVForm>
// 					</TabsContent>))}
// 				</Tabs>
// 			</div> */}
// 			<div>
// 				{/* <RVForm form={variantForm} className='gap-2 flex	flex-col  bg-white p-4	rounded-md shadow-md'>
// 					<FromInput name="width" label="Width" scope={variantForm.scope('width')} />
// 					<FromInput name="weight" label="Weight" scope={variantForm.scope('weight')} />
// 					<FromInput name="diameter" label="Diameter" scope={variantForm.scope('diameter')} />
// 					<FromInput name="et" label="ET" scope={variantForm.scope('et')} />
// 					<FromInput name="pcd" label="PCD" scope={variantForm.scope('pcd')} />
// 					<div>
// 						<p className='pb-2'>Color</p>
// 						<Popover open={open} onOpenChange={setOpen}>
// 							<PopoverTrigger asChild>
// 								<Button
// 									variant="outline"
// 									role="combobox"
// 									aria-expanded={open}
// 									className="w-[200px] justify-between"
// 								>
// 									{value
// 										? categories.find((framework) => framework.value === value)?.label
// 										: "Select color..."}
// 									<ChevronsUpDown className="opacity-50" />
// 								</Button>
// 							</PopoverTrigger>
// 							<PopoverContent className="w-[200px] p-0">
// 								<Command>
// 									<CommandInput placeholder="Search framework..." className="h-9" />
// 									<CommandList>
// 										<CommandEmpty>No framework found.</CommandEmpty>
// 										<CommandGroup>
// 											{categories.map((framework) => (
// 												<CommandItem
// 													key={framework.value}
// 													value={framework.value}
// 													onSelect={(currentValue) => {
// 														setValue(currentValue === value ? "" : currentValue)
// 														setOpen(false)
// 													}}
// 												>
// 													{framework.label}
// 													<Check
// 														className={clsx(
// 															"ml-auto",
// 															value === framework.value ? "opacity-100" : "opacity-0"
// 														)}
// 													/>
// 												</CommandItem>
// 											))}
// 										</CommandGroup>
// 									</CommandList>
// 								</Command>
// 							</PopoverContent>
// 						</Popover>
// 					</div>
// 				</RVForm> */}
// 			</div>
// 			<div>
// 				<Button onClick={handleSaveButton}>Save</Button>
// 			</div>

// 		</div>

// 	)
// }

// export default Admin


import { useCallback, useState } from 'react'
import { withZod } from '@rvf/zod'
import { useForm } from '@rvf/react'
import RVForm from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FromInput } from '@/components/ui/form-input'
import { useDropzone } from 'react-dropzone'
import { Image } from '@/shared/types'

const Admin = () => {
	const validator = withZod(z.object({
		title: z.string().min(3).max(255),
		description: z.string().min(3).max(255),
		price: z.coerce.number().min(0),
		// images: z.array(z.object({ base64: z.string(), originalName: z.string(), isThumbnail: z.boolean() })),
		width: z.coerce.number().min(0),
		weight: z.coerce.number().min(0),
		diameter: z.coerce.number().min(0),
		et: z.coerce.number().min(0),
		pcd: z.coerce.number().min(0),
		color: z.string().min(3).max(255),
		quantity: z.coerce.number().min(0)
	}))
	const form = useForm({
		validator,

		defaultValues: {
			title: 'asd',
			description: 'asd',
			price: '0',
			// images: [{ base64: '', originalName: '', isThumbnail: false }],
			width: 0,
			weight: 0,
			diameter: 0,
			et: 0,
			pcd: 0,
			color: 'GREEN',
			quantity: 0
		},
		handleSubmit: async (validatedData) => {
			const data = {
				description: validatedData.description,
				title: validatedData.title,
				variants: [{
					color: validatedData.color,
					images: base64Files,
					thumbnail: base64Files[0],
					price: validatedData.price,
					width: validatedData.width,
					weight: validatedData.weight,
					diameter: validatedData.diameter,
					et: validatedData.et,
					pcd: validatedData.pcd,
					quantity: validatedData.quantity
				}]
			}
			fetch('http://localhost:3000/product/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
		}
	})

	const [base64Files, setBase64Files] = useState<Image[]>([])
	const [files, setFiles] = useState<File[]>([])
	console.log('files', files)
	const fileToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = reject;
		});
	};
	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		const newFiles = [...files, ...acceptedFiles];
		setFiles(newFiles);
		const base64Images = await Promise.all(acceptedFiles.map(fileToBase64));
		const imageFiles = base64Images.map((base64, index) => ({
			base64,
			originalName: acceptedFiles[index].name,
			isThumbnail: index === 0,
		}));
		setBase64Files([...base64Files, ...imageFiles]);
	}, [files, base64Files]);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { 'image/*': [] },
		onDrop,
	});
	return (
		<RVForm form={form}>
			<FromInput name="title" label="Title" scope={form.scope('title')} />
			<FromInput name="description" label="Description" scope={form.scope('description')} />
			<FromInput name="price" label="Price" scope={form.scope('price')} />
			<FromInput name="width" label="Width" scope={form.scope('width')} type='number' />
			<FromInput name="weight" label="Weight" scope={form.scope('weight')} type='number' />
			<FromInput name="diameter" label="Diameter" scope={form.scope('diameter')} type='number' />
			<FromInput name="et" label="ET" scope={form.scope('et')} type='number' />
			<FromInput name="pcd" label="PCD" scope={form.scope('pcd')} type='number' />
			<FromInput name="color" label="Color" scope={form.scope('color')} />
			<FromInput name="quantity" label="Quantity" scope={form.scope('quantity')} type='number' />
			<div>
				<p className="pb-2">Media</p>
				<div  {...getRootProps()} className="flex flex-col gap-2 h-[100px] border-dotted border-2 border-gray-300 p-4 rounded-md hover:bg-gray-100/50">
					<input {...getInputProps()} className="hidden " />
					<div className="w-full text-center cursor-pointer h-full	flex items-center justify-center">
						{isDragActive ? (
							<p>Drop the files here ...</p>
						) : (
							<p>Drag 'n' drop some files here, or click to select files</p>
						)}
					</div>
				</div>
			</div>
			<Button type='submit'>
				Save
			</Button>
		</RVForm>
	)
}

export default Admin