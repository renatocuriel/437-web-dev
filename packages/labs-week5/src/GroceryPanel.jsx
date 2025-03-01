import React from "react";
import "./GroceryPanel.css";
import Spinner from "./Spinner";
import { groceryFetcher } from "./groceryFetcher";

const MDN_URL = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";

/**
 * Creates and returns a new promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms the number of milliseconds to delay
 * @returns {Promise<undefined>} a promise that resolves with the value of `undefined` after the specified delay
 */
function delayMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function GroceryPanel(props) {
    const [groceryData, setGroceryData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [selectedSource, setSelectedSource] = React.useState("MDN"); // Track dropdown selection

    async function fetchData(url) {
        try {
            setIsLoading(true);
            setError(null);

            const data = await groceryFetcher.fetch(url); // Fetch grocery data
            setGroceryData(data);
        } catch (error) {
            setError("Error fetching data: " + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    // function handleDropdownChange(e) {
    //     const selectedUrl = e.target.value;
        
    //     // Clear grocery data when changing sources
    //     setGroceryData([]);
    
    //     if (selectedUrl) {
    //         fetchData(selectedUrl);
    //     }
    // }

    function handleDropdownChange(e) {
        setSelectedSource(e.target.value); // Update state, useEffect will handle fetching
    }
    

    function handleAddTodoClicked(item) {
        const todoName = `Buy ${item.name} (${item.price.toFixed(2)})`;
        // TODO complete this
        props.onAddTask(todoName);
    }


    React.useEffect(() => {
        let isStale = false; // Track if request is outdated
    
        async function fetchData(source) {
            try {
                setIsLoading(true);
                setError(null);
    
                const data = await groceryFetcher.fetch(source);
    
                if (!isStale) {
                    setGroceryData(data); // Update only if request is valid
                }
            } catch (error) {
                if (!isStale) {
                    setError("Error fetching data: " + error.message);
                }
            } finally {
                if (!isStale) {
                    setIsLoading(false);
                }
            }
        }
    
        fetchData(selectedSource); // Fetch data for the current dropdown value
    
        return () => {
            isStale = true; // Mark request as outdated when component re-renders
        };
    }, [selectedSource]); // Run useEffect when selectedSource changes
    
    
    return (
        <div>
            <h1 className="text-xl font-bold">Groceries prices today</h1>
            <label className="mb-4 flex gap-4">
                Get prices from:
                <select 
                    className="border border-gray-300 p-1 rounded-sm disabled:opacity-50"
                    onChange={handleDropdownChange}
                    //disabled={isLoading}
                >
                    <option value="MDN">MDN</option>
                    <option value="Liquor store">Liquor store</option>
                    <option value="Butcher">Butcher</option>
                    <option value="whoknows">Who knows?</option>
                </select>

                {isLoading && <Spinner />}
                {error && <span className="text-red-500 ml-2">{error}</span>}
            </label>

            {
                groceryData.length > 0 ?
                    <PriceTable items={groceryData} onAddClicked={handleAddTodoClicked} /> :
                    "No data"
            }
        </div>
    );
}


function PriceTable(props) {
    return (
        <table className="mt-4">
            <thead>
            <tr>
                <th className="text-left">Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {
                props.items.map(item =>
                    <PriceTableRow
                        key={item.name}
                        item={item}
                        onAddClicked={() => props.onAddClicked(item)}
                    />
                )
            }
            </tbody>
        </table>
    );
}

function PriceTableRow({item, onAddClicked}) {
    const buttonClasses = `italic px-2 rounded-sm border border-gray-300
        hover:bg-gray-100 active:bg-gray-200 cursor-pointer`;
    return (
        <tr>
            <td>{item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>
                <button className={buttonClasses} onClick={onAddClicked}>
                    Add to todos
                </button>
            </td>
        </tr>
    );
}

export default GroceryPanel;