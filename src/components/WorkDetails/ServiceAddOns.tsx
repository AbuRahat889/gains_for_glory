"use client";

import { Check, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Button from "../Button";
// import { Button } from "@/components/ui/button"

interface AddOnItem {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
}

export default function ServiceAddOns() {
  const [selectedItems, setSelectedItems] = useState<AddOnItem[]>([]);

  const addOns: AddOnItem[] = [
    {
      id: "dog-hair",
      name: "Dog hair removal",
      price: 75,
      priceDisplay: "$75",
    },
    {
      id: "engine-bay",
      name: "Engine bay deep cleaning",
      price: 75,
      priceDisplay: "$75",
    },
    { id: "mold", name: "Mold removal", price: 75, priceDisplay: "$75" },
    { id: "odor", name: "Odor removal", price: 100, priceDisplay: "$100" },
    { id: "tree-sap", name: "Tree Sap", price: 50, priceDisplay: "$50" },
    { id: "overspray", name: "Overspray", price: 75, priceDisplay: "$75" },
    { id: "claybar", name: "Claybar", price: 75, priceDisplay: "$75" },
    {
      id: "ceramic-6m",
      name: "Ceramic coating (3 to 6 months)",
      price: 75,
      priceDisplay: "$75",
    },
    {
      id: "ceramic-5y",
      name: "Ceramic coating (5 years)",
      price: 75,
      priceDisplay: "$75",
    },
    {
      id: "scratch-1",
      name: "Scratch removal - stage 1",
      price: 425,
      priceDisplay: "$425",
    },
    {
      id: "scratch-2",
      name: "Scratch removal - stage 2",
      price: 725,
      priceDisplay: "$725",
    },
    {
      id: "scratch-3",
      name: "Scratch removal - stage 3",
      price: 1025,
      priceDisplay: "$1025",
    },
    {
      id: "paint-protection",
      name: "Paint protection film",
      price: 0,
      priceDisplay: "Call for quote",
    },
  ];

  const toggleItem = (id: string, name: string, price: number) => {
    setSelectedItems((prev: any) => {
      const exists = prev.find((item: any) => item.id === id);
      if (exists) {
        return prev.filter((item: any) => item.id !== id); // Remove if already selected
      } else {
        return [...prev, { id, name, price }]; // Add new item
      }
    });
  };
  const isSelected = (id: string) =>
    selectedItems.some((selected) => selected.id === id);

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const selectedCount = selectedItems.length;

  //set data into localstore

  localStorage.setItem("addOnes", JSON.stringify(selectedItems));

  return (
    <div className="bg-backgroundColor ">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-xl font-light text-primaryColor mb-6">Add Ons</h2>

        <div className="space-y-4">
          {addOns.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2 border-b border-gray-100"
            >
              <div className="flex-1">
                <div className="text-gray-700">{item.name}</div>
                <div className="text-gray-500">{item.priceDisplay}</div>
              </div>

              <button
                onClick={() => toggleItem(item?.id, item?.name, item.price)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isSelected(item.id)
                    ? "bg-primaryColor text-white"
                    : "bg-gray-200 text-textColor hover:bg-gray-300"
                }`}
                aria-label={
                  isSelected(item.id)
                    ? `Remove ${item.name}`
                    : `Add ${item.name}`
                }
              >
                {isSelected(item.id) ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Check className="w-5 h-5" />
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button
            className="w-full py-3 bg-red-400 hover:bg-red-500 text-white rounded-md"
            disabled={selectedCount === 0}
            link={"/date-picker"}
          >
            {selectedCount > 0
              ? `Add ${selectedCount} - $${totalPrice}`
              : "Add Items"}
          </Button>
        </div>
      </div>
    </div>
  );
}
