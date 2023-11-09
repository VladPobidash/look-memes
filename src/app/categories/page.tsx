'use client'

import {useEffect, useState} from 'react'
import {useSearchParams} from 'next/navigation'
import AppButton from '@/components/AppButton'
import AppToggle from '@/components/AppToggle'
import SortableCategories from '@/app/categories/components/SortableCategories'
import SortableCategory from '@/app/categories/components/SortableCategory'
import {Dialog} from '@headlessui/react'
import SvgIcon from '@/components/SvgIcon'
import {Category} from '@/utils/mock-category-api/common'
import useUndo from '@/app/hooks/useUndo'

export default function Categories() {
    const searchParams = useSearchParams()

    const {
        items,
        setItems,
        hasChanges,
        onChange,
        saveChanges,
        cancelChanges,
    } = useUndo()
    const [filtered, setFiltered] = useState<Array<Category>>([])
    const [showDialog, setShowDialog] = useState(false)
    const [enableOther, setEnableOther] = useState(true)
    const [tempId, setTempId] = useState('')

    useEffect(() => {
        try {
            fetch('/api/categories').then(res => res.json()).then(data => setItems(data.categories))
        } catch (e) {
            console.error(e)
        }
    }, [setItems])

    useEffect(() => {
        const query = searchParams.get('searchQuery')

        if (query && query.length >= 2) {
            setFiltered(items.filter(c => c.name.toLowerCase().includes(query.toLowerCase())))
        } else {
            setFiltered(items)
        }
    }, [items, searchParams, setFiltered])

    const closeDialog = () => setShowDialog(false)

    const handleSave = async () => {
        try {
            if (tempId === 'reorder') {
                items.forEach((item, order) => {
                    handleSubmit({...item, order})
                })
                saveChanges()
            } else {
                const item = items.find(c => c.id === tempId)
                if (item) {
                    await handleSubmit(item)
                    saveChanges()
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    const addDrawCategory = () => {
        setItems([{
            id: crypto.randomUUID(),
            name: '',
            enabled: false,
            order: 0,
            isNew: true
        }, ...items])
    }

    const reorder = (reordered: Array<Category>) => {
        onChange()
        setTempId('reorder')
        setItems(reordered)
    }

    const toggleCategory = (id: string) => {
        if (!items.find(c => c.id === id)?.isNew) onChange()

        const updated = [...items]
        const toggled = updated.find(c => c.id === id)

        if (toggled) {
            setTempId(toggled.id)
            toggled.enabled = !toggled.enabled
        }

        setItems(updated)
    }

    const confirmDelete = (id: string, deleteDraft: boolean = false) => {
        if (deleteDraft) {
            setItems(items.filter((c) => c.id !== id))
            return
        }
        setShowDialog(true)
        setTempId(id)
    }

    const deleteCategory = async (id: string) => {
        try {
            const response = await fetch('/api/categories/' + id, {
                method: 'DELETE',
                headers: {'content-type': 'application/json'},
            })
            if (response.status === 200) {
                setItems(items.filter((c) => c.id !== id))
            }
        } catch (e) {
            console.error(e)
        } finally {
            setShowDialog(false)
        }
    }

    const handleSubmit = async (category: Category) => {
        const isNew = items.find(c => c.id === category.id)?.isNew

        let data: Category = {} as Category
        try {
            if (isNew) {
                delete category.isNew
                data = await fetch('/api/categories', {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(category),
                }).then(res => res.json())
            } else {
                data = await fetch('/api/categories/' + category.id, {
                    method: 'PUT',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(category),
                }).then(res => res.json())
            }
        } catch (e) {
            console.error(e)
        } finally {
            const index = items.findIndex(c => c.id === data.id)
            items.splice(index, 1, data)
            setItems(items)
            console.log('Updated data:', data)
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center mt-10">
            <section className="container px-4 sm:px-0 md:w-3/4 lg:w-6/12">
                <AppButton text="Create a Category" color="#884DFE" className="w-full" height="50px"
                           icon={{name: 'plus', width: 14, height: 14}} onClick={addDrawCategory}/>
                <SortableCategories
                    items={filtered}
                    onChange={reorder}
                    renderItem={(category) => (
                        <SortableCategory
                            category={category}
                            onSubmit={handleSubmit}
                            onToggle={toggleCategory}
                            onDelete={confirmDelete}
                        />
                    )}
                />
                <div className="flex justify-between items-center px-5 py-3 text-sm rounded border-2 border-[#323443]">
                    <span className="text-white">Other</span>
                    <div className="flex space-x-5">
                        <AppToggle enabled={enableOther} onChange={() => setEnableOther(!enableOther)}/>
                        <div style={{width: '26px', height: '26px'}}/>
                        <div style={{width: '8px', height: '14px'}}/>
                    </div>
                </div>
            </section>

            {hasChanges
                ? <div className="w-full bg-[#2E2F3C] fixed bottom-0">
                    <div
                        className="container mx-auto px-4 sm:px-0 grid sm:grid-cols-2 gap-4 sm:gap-[26px] py-5">
                        <AppButton text="Save Changes" color="#45CB54" icon={{name: 'check', width: 14, height: 14}}
                                   onClick={handleSave}/>
                        <AppButton text="Cancel" outlined onClick={cancelChanges}/>
                    </div>
                </div>
                : null
            }

            <Dialog open={showDialog} onClose={closeDialog} className="relative z-50">
                <div className="fixed inset-0 bg-[#15161B] bg-opacity-90" aria-hidden="true"/>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <Dialog.Panel
                        className="relative flex flex-col items-center px-6 py-8 rounded bg-[#272934] text-center">
                        <SvgIcon className="absolute top-5 right-5" name="close" width={10} height={10}
                                 onClick={closeDialog}/>

                        <Dialog.Title className="font-medium text-2xl">Delete the Category?</Dialog.Title>

                        <p className="my-6 text-[#9B9D9F]">
                            All templates in the category will be <br/> moved to the category &quot;Other&quot;
                        </p>
                        <button
                            className="flex justify-center w-[352px] py-5 outline-none rounded bg-gradient-to-r from-[#A139FD] to-[#50BDFC]"
                            onClick={() => deleteCategory(tempId)}
                        >
                            <SvgIcon name="delete" width={24} height={24}/>
                            <span className="font-bold text-white">Delete</span>
                        </button>
                        <button className="outline-none mt-6 text-[#FF5B5B]" onClick={closeDialog}>Cancel</button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </main>
    )
}
