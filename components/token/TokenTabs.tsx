import React from "react";

interface Tab {
  id: string;
  label: string;
}

interface TokenTabsProps {
  activeTab: string;
  onChange: (tabId: string) => void;
  isSolana: boolean;
}

const TokenTabs: React.FC<TokenTabsProps> = ({ activeTab, onChange, isSolana }) => {
  const tabs: Tab[] = [
    { id: "transactions", label: "Transactions" },
    ...(isSolana
      ? []
      : [
          { id: "holders", label: "Holders" },
          { id: "holder-insights", label: "Holder Insights" },
        ]),
    { id: "snipers", label: "Snipers" },
  ];

  return (
    <div className="flex border-b border-dex-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-6 py-3 font-medium text-sm ${
            activeTab === tab.id
              ? "text-dex-text-primary border-b-2 border-dex-blue"
              : "text-dex-text-secondary hover:text-dex-text-primary"
          }`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TokenTabs;