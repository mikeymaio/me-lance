import React from 'react';

const FilterLink = ({
        filter,
        currentFilter,
        children,
        action
    }) => {
        if (filter === currentFilter) {
            return <span style={{marginLeft: '5px', color: "#aaa"}}>{children}</span>;
        }
        return (
            <a href="#"
            style={{marginLeft: '5px', color: "#076"}}
            onClick={e => {
            e.preventDefault();
            action(filter)
            }} >
            {children}
            </a>
        );
    };
    // add stuff

    export default FilterLink;