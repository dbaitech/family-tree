"use client";

import { useEffect, useRef } from "react";
import FamilyTreeJS from "@balkangraph/familytree.js";
import family from "@/data/family.json";

export default function FamilyTree() {
  const treeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!treeRef.current) return;

    const tree = new FamilyTreeJS(treeRef.current, {
      mouseScrool: FamilyTreeJS.none,
      scaleInitial: getOptions().scaleInitial,
      siblingSeparation: 120,
      editForm: {
        // disable editing
        readOnly: true,
        buttons: {
          edit: null,
          share: null,
          pdf: null,
          remove: null,
        },
      },
      template: "john",
      nodes: family,
      nodeBinding: {
        field_0: "name",
      },
    });

    return () => {
      tree.destroy?.();
    };
  }, []);

  return <div id="tree" ref={treeRef} className="h-screen w-full" />;
}

function getOptions() {
  const searchParams = new URLSearchParams(window.location.search);
  const fit = searchParams.get("fit");
  let enableSearch = true;
  let scaleInitial = 1;
  if (fit == "yes") {
    enableSearch = false;
    scaleInitial = FamilyTreeJS.match.boundary;
  }
  return { enableSearch, scaleInitial };
}
