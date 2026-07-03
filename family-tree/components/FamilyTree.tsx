"use client";

import { useEffect, useRef, useState } from "react";
import FamilyTreeJS from "@balkangraph/familytree.js";
// import PersonSidePanel from "./PersonSidePanel";
import { BalkanNode } from "@/types/types";

export default function FamilyTree() {
  const treeRef = useRef<HTMLDivElement | null>(null);

  const [nodes, setNodes] = useState<BalkanNode[]>([]);
  // const [selectedPerson, setSelectedPerson] = useState<BalkanNode | null>(null);

  useEffect(() => {
    if (!treeRef.current) return;

    let tree: FamilyTreeJS | undefined;

    async function loadTree() {
      try {
        const response = await fetch("/api/tree");
        const treeData = await response.json();
        setNodes(treeData);
        console.log(treeData);

        tree = new FamilyTreeJS(treeRef.current!, {
          // mouseScrool: FamilyTreeJS.none,
          scaleInitial: getOptions().scaleInitial,
          siblingSeparation: 120,

          editForm: {
            readOnly: true,
            generateElementsFromFields: false,
            elements: [
              { type: "textbox", label: "Name", binding: "name" },
              { type: "textbox", label: "Née", binding: "maiden_name" },
              { type: "textbox", label: "Nickname", binding: "nickname" },
              {
                type: "textbox",
                label: "Place of Birth",
                binding: "birth_location",
              },
              { type: "date", label: "Date Deceased", binding: "death_date" },
              {
                type: "textbox",
                label: "Place of Death",
                binding: "death_location",
              },
              { type: "date", label: "Birth Date", binding: "birth_date" },
              { type: "textbox", label: "Biography", binding: "bio" },
            ],
            buttons: {
              edit: null,
              share: null,
              pdf: null,
              remove: null,
            },
          },

          template: "john",

          nodes: treeData,

          nodeBinding: {
            field_0: "name",
          },
        });

        // tree.on("click", (sender, args) => {
        //   console.log(sender);
        //   console.log(args);
        //   const person = nodes.find((n) => n.id === args.node.id);

        //   if (person) {
        //     setSelectedPerson(person);
        //   }
        // });
      } catch (err) {
        console.error("Failed to load family tree:", err);
      }
    }

    loadTree();

    return () => {
      tree?.destroy();
    };
  }, []);

  return <div id="tree" ref={treeRef} className="h-screen w-full" />;
  // return (
  //   <div className="flex h-screen">
  //     <div ref={treeRef} className="flex-1" />

  //     <PersonSidePanel person={selectedPerson} />
  //   </div>
  // );
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
