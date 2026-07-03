"use client";

import { useEffect, useRef } from "react";
import FamilyTreeJS from "@balkangraph/familytree.js";

export default function FamilyTree() {
  const treeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!treeRef.current) return;

    let tree: FamilyTreeJS | undefined;

    async function loadTree() {
      try {
        const response = await fetch("/api/tree");
        const treeData = await response.json();
        console.log(treeData);

        tree = new FamilyTreeJS(treeRef.current!, {
          mouseScrool: FamilyTreeJS.none,
          scaleInitial: getOptions().scaleInitial,
          siblingSeparation: 120,

          editForm: {
            readOnly: true,
            buttons: {
              edit: null,
              share: null,
              pdf: null,
              remove: null,
            },
            generateElementsFromFields: false,

            // Custom data fields added to the side pane
            elements: [
              {
                type: "textbox",
                label: "Name",
                binding: "name",
              },
              {
                type: "textbox",
                label: "Place of Birth",
                binding: "birth_location",
              },
              { type: "date", label: "Birth Date", binding: "birth_date" },
              {
                type: "textbox",
                label: "Short Biography",
                binding: "bio",
              },
            ],
          },

          template: "john",

          nodes: treeData,

          nodeBinding: {
            field_0: "name",
          },
        });
      } catch (err) {
        console.error("Failed to load family tree:", err);
      }
    }

    loadTree();

    return () => {
      tree?.destroy();
    };
  }, []);

  return <div ref={treeRef} className="h-screen w-full" />;
}

function getOptions() {
  const searchParams = new URLSearchParams(window.location.search);

  const fit = searchParams.get("fit");

  let enableSearch = true;
  let scaleInitial = 1;

  if (fit === "yes") {
    enableSearch = false;
    scaleInitial = FamilyTreeJS.match.boundary;
  }

  return { enableSearch, scaleInitial };
}
