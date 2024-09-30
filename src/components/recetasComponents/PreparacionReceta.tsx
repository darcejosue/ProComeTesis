import { useState } from 'react';

interface Tab {
    id: number;
    name: string;
    content: string;
}

const tabs: Tab[] = [
    { id: 1, name: 'Ingredientes', content: 'Aquí van los ingredientes' },
    { id: 2, name: 'Preparación', content: 'Aquí va la preparación' },
];

const PreparacionShow = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
                <div className="flex justify-between mb-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`px-4 py-2 ${activeTab.id === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded-md`}
                            onClick={() => handleTabChange(tab)}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
                <div className="mb-4">
                    <p>{activeTab.content}</p>
                </div>

            </div>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => window.close()}>
                Salir
            </button>
        </div>
    );
};

export default PreparacionShow;