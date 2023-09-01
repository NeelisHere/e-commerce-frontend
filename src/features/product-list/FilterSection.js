import { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { productSlice } from './productListSlice'
// import { fetchAllProductsByFiltersAsync } from './productListSlice.js'

const FilterSection = ({ id, name, options, productfilters, setProductfilters }) => {
    const dispatch = useDispatch()
    const { updateBrands, updateCategories } = productSlice.actions
    return (
        <Disclosure as="div" className="border-b border-gray-200 py-6">
            {({ open }) => (
                <>
                    <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-gray-100 py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{name}</span>
                            <span className="ml-6 flex items-center">
                                {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                            </span>
                        </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                            {options.map((option, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={(e) => {
                                            if(id === 'brands') {
                                                dispatch(updateBrands({ index, value: e.target.checked }));
                                            } else {
                                                dispatch(updateCategories({ index, value: e.target.checked }))
                                            }
                                        
                                            if(e.target.checked) {
                                                // console.log('@', option)
                                                setProductfilters({
                                                    ...productfilters,
                                                    [id]: [...productfilters[[id]], option.value]
                                                })
                                            } else {
                                                setProductfilters({
                                                    ...productfilters,
                                                    [id]: productfilters[[id]].filter((b) => b !== option.value)
                                                })
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor={`filter-${'brand'}-${index}`}
                                        className="ml-3 text-sm text-gray-600"
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default FilterSection
