"use client";

import { useEffect, useRef, useState } from "react";
import FamilyTreeJS from "@balkangraph/familytree.js";
import PersonSidePanel from "./PersonSidePanel";
import { BalkanNode } from "@/types/types";

FamilyTreeJS.templates.myTemplate = Object.assign(
  {},
  FamilyTreeJS.templates.tommy,
);

FamilyTreeJS.templates.myTemplate.size = [300, 100];
FamilyTreeJS.templates.myTemplate.node = `<rect x="0" y="0" height="{h}" width="{w}" stroke-width="1" fill="white" stroke="#D3D3D3" rx="7" ry="7"></rect>
    <circle cx="50" cy="50" fill="#039BE5" r="35"></circle>`;
FamilyTreeJS.templates.myTemplate.link =
  '<path stroke-linejoin="round" stroke="#6D8FB2" stroke-width="1px" fill="none" d="{edge}" />';
FamilyTreeJS.templates.myTemplate.field_0 =
  "<text " +
  FamilyTreeJS.attr.width +
  ' ="200" style="font-size: 16px;" fill="#19447E" x="190" y="55" text-anchor="middle">{val}</text>';
FamilyTreeJS.templates.myTemplate.img_0 = `<clipPath id="ulaImg"><circle cx="50" cy="50" r="35" fill="#248CE6"></circle></clipPath>
    <image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="12" y="10" width="75" height="75"></image>`;

FamilyTreeJS.templates.myTemplate_male = Object.assign(
  {},
  FamilyTreeJS.templates.myTemplate,
);
FamilyTreeJS.templates.myTemplate_female = Object.assign(
  {},
  FamilyTreeJS.templates.myTemplate,
);

export default function FamilyTree() {
  const treeRef = useRef<HTMLDivElement | null>(null);

  const [nodes, setNodes] = useState<BalkanNode[]>([]);
  const nodesRef = useRef<BalkanNode[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<BalkanNode | null>(null);

  useEffect(() => {
    if (!treeRef.current) return;

    let tree: FamilyTreeJS | undefined;

    async function loadTree() {
      try {
        const response = await fetch("/api/tree");
        const treeData = await response.json();
        nodesRef.current = treeData;
        setNodes(treeData);
        console.log(treeData);

        tree = new FamilyTreeJS(treeRef.current!, {
          scaleInitial: getOptions().scaleInitial,
          levelSeparation: 80,
          siblingSeparation: 30,

          // editForm: {
          //   readOnly: true,
          //   generateElementsFromFields: false,
          //   elements: [
          //     { type: "textbox", label: "Name", binding: "name" },
          //     { type: "textbox", label: "Née", binding: "maiden_name" },
          //     { type: "textbox", label: "Nickname", binding: "nickname" },
          //     { type: "date", label: "Birth Date", binding: "birth_date" },
          //     {
          //       type: "textbox",
          //       label: "Place of Birth",
          //       binding: "birth_location",
          //     },
          //     { type: "date", label: "Date Deceased", binding: "death_date" },
          //     {
          //       type: "textbox",
          //       label: "Place of Death",
          //       binding: "death_location",
          //     },
          //     { type: "textbox", label: "Biography", binding: "bio" },
          //   ],
          //   buttons: {
          //     edit: null,
          //     share: null,
          //     pdf: null,
          //     remove: null,
          //   },
          // },

          nodeMouseClick: FamilyTreeJS.action.none,
          template: "myTemplate",

          tags: {
            tweet: {
              template: "tweet",
            },
          },

          nodes: treeData,

          nodeBinding: {
            field_0: "name",
          },
        });

        tree.on("click", (sender, args) => {
          const person = nodesRef.current.find((n) => n.id === args.node.id);
          setSelectedPerson(person ?? null);
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

  // return <div id="tree" ref={treeRef} className="h-screen w-full" />;
  return (
    <div className="relative h-screen w-screen">
      <div ref={treeRef} className="h-full w-full" />

      {selectedPerson && (
        <div className="absolute right-0 top-0 h-full w-80 bg-white border-l shadow-lg overflow-y-auto">
          <PersonSidePanel person={selectedPerson} />
        </div>
      )}
    </div>
  );
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
