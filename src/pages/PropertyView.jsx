import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Box } from "lucide-react";
import api from "../services/api";
import EntityCard from "../components/EntityCard";
import ActionModal from "../components/ActionModal";
import Breadcrumb from "../components/Breadcrumb";
import { tagCode } from "../utils/tagCode.js";

export default function PropertyView() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedSpace, setSelectedSpace] = useState(null);

  useEffect(() => {
    const fetchPropertyAndSpaces = async () => {
      try {
        const [propRes, spacesRes] = await Promise.all([
          api.get(`/properties/${propertyId}`),
          api.get(`/spaces/property/${propertyId}`),
        ]);
        setProperty(propRes.data);
        setSpaces(spacesRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPropertyAndSpaces();
  }, [propertyId]);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedSpace(null);
    setIsModalOpen(true);
  };

  const openEditModal = (space) => {
    setModalMode("edit");
    setSelectedSpace(space);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this space? All nested containers and items will be lost.",
      )
    ) {
      try {
        await api.delete(`/spaces/${id}`);
        setSpaces(spaces.filter((s) => s.id !== id));
      } catch (error) {
        alert(
          "Delete failed: " +
            (error.response?.data?.message || "Check backend terminal."),
        );
      }
    }
  };

  const handleModalSubmit = async (data) => {
    if (modalMode === "create") {
      const payload = { ...data, propertyId: propertyId };
      const res = await api.post("/spaces", payload);
      setSpaces([...spaces, res.data]);
    } else {
      const res = await api.put(`/spaces/${selectedSpace.id}`, data);
      setSpaces(spaces.map((s) => (s.id === selectedSpace.id ? res.data : s)));
    }
  };

  if (isLoading)
    return (
      <div className="font-mono text-sm text-ink-700">Loading spaces...</div>
    );
  if (!property)
    return (
      <div className="font-mono text-sm text-clay">Property not found</div>
    );

  return (
    <div className="animate-fade-in">
      <Breadcrumb trail={[{ label: property.name }]} />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink-900">
            {property.name}
          </h2>
          <p className="mt-1 font-mono text-sm tracking-wide text-ink-700">
            {spaces.length} spaces
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-lg bg-brass px-4 py-2 font-sans text-sm font-semibold text-white transition hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(168,118,58,0.4)]"
        >
          <Plus size={18} />
          Add Space
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {spaces.map((space) => (
          <EntityCard
            key={space.id}
            title={space.name}
            subtitle="Space"
            code={tagCode("space", space.id)}
            icon={Box}
            onClick={() => navigate(`/space/${space.id}`)}
            onEdit={() => openEditModal(space)}
            onDelete={() => handleDelete(space.id)}
          />
        ))}
      </div>

      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "create" ? "Add New Space" : "Edit Space"}
        submitText={modalMode === "create" ? "Create Space" : "Save Changes"}
        initialData={selectedSpace}
        fields={[
          {
            name: "name",
            label: "Space Name (e.g., Garage, Attic)",
            required: true,
          },
        ]}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
