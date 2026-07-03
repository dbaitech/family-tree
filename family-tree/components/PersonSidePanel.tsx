// import type { BalkanNode } from "@/types/types";

// interface PersonSidePanelProps {
//   person: BalkanNode | null;
// }

// export default function PersonSidePanel({ person }: PersonSidePanelProps) {
//   if (!person) {
//     return (
//       <div className="w-80 border-l p-4">
//         <p>Select a person.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-80 border-l p-4 overflow-y-auto">
//       <h2 className="text-xl font-bold">{person.name}</h2>

//       <div className="mt-4">
//         <p>
//           <strong>Birth Date:</strong> {person.birth_date}
//         </p>

//         <p>
//           <strong>Birth Location:</strong> {person.birth_location}
//         </p>

//         <p className="mt-4">
//           <strong>Biography</strong>
//         </p>

//         <p>{person.bio}</p>
//       </div>
//     </div>
//   );
// }
