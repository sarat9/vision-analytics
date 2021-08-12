import React, { useState, useEffect } from 'react'

/**
 * @function useSelectedListOfValues
 * @description React Hook to use List where we can select or unselect list of items
 * @param {any} value
 * @returns {any} 
 * @author Sarat Chandra Ejjapureddi
 */
export default function useSelectItemsList(defaultList = [], uniqueValue = 'id', domReadable = 'name') {

 

    const [list, setList] = useState(defaultList)



    const [uniqueRefValue, setUniqueRefValue] = useState(uniqueValue)
    const [selectedList, setSelectedList] = useState([])

    const handleSelect = (event) => {
        setSelectedList({ ...selectedList, [event.target.name]: event.target.checked });
    };

    return [list, selectedList, handleSelect]
}


/**
 * 
 *     const [list] = useSelectedList(options, 'id')
 */