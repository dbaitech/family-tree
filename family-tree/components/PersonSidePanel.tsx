import type { BalkanNode } from "@/types/types";

interface PersonSidePanelProps {
  person: BalkanNode | null;
  onClose: () => void;
}

export default function PersonSidePanel({
  person,
  onClose,
}: PersonSidePanelProps) {
  if (!person) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 border-b p-4">
        <button
          onClick={onClose}
          className="text-xl font-bold px-2 py-1 hover:bg-gray-100 rounded"
        >
          ←
        </button>

        <h2 className="text-xl font-bold">{person.name}</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Maiden name (only if exists) */}
        {person.maiden_name && (
          <p>
            <strong>Maiden Name:</strong> {person.maiden_name}
          </p>
        )}

        {/* Birth info */}
        <p>
          <strong>Birth Date:</strong> {person.birth_date}
        </p>

        <p>
          <strong>Birth Location:</strong> {person.birth_location}
        </p>

        {/* Death info (only if NOT living) */}
        {!person.is_living && (
          <>
            {person.death_date && (
              <p>
                <strong>Death Date:</strong> {person.death_date}
              </p>
            )}

            {person.death_location && (
              <p>
                <strong>Death Location:</strong> {person.death_location}
              </p>
            )}
          </>
        )}

        {/* Biography */}
        <div>
          <p className="font-bold">Biography</p>
          <p className="mt-2">{person.bio}</p>
        </div>
      </div>
    </div>
  );
}
