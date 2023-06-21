import React from 'react'
import { Input } from 'antd'

function SearchField({ updateFilterQUery }) {
    const { Search } = Input
    return (
        <>
            <Search
                placeholder="eg. ODR23031301d6"
                onChange={(e) => {
                    updateFilterQUery("search", e.target.value)

                }}
                allowClear={true}
            />
        </>
    )
}

export default SearchField