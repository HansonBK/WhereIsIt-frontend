import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Home } from "lucide-react";
import api from "../services/api";
import EntityCard from "../components/EntityCard";
import ActionModal from "../components/ActionModal";
import { tagCode } from "../utils/tagCode.js";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get("/properties");
        setProperties(res.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedProperty(null);
    setIsModalOpen(true);
  };

  const openEditModal = (property) => {
    setModalMode("edit");
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this property? All spaces and items inside will be lost.",
      )
    ) {
      try {
        await api.delete(`/properties/${id}`);
        setProperties(properties.filter((p) => p.id !== id));
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
      const res = await api.post("/properties", data);
      setProperties([...properties, res.data]);
    } else {
      const res = await api.put(`/properties/${selectedProperty.id}`, data);
      setProperties(
        properties.map((p) => (p.id === selectedProperty.id ? res.data : p)),
      );
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            Your Properties
          </h2>
          <p className="mt-1 font-mono text-xs tracking-wide text-ink-700 sm:text-sm">
            {properties.length} active properties
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brass px-4 py-3 font-sans text-sm font-semibold text-white shadow-sm transition hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(168,118,58,0.4)] sm:w-auto sm:py-2.5"
        >
          <Plus size={18} />
          Add Property
        </button>
      </div>

      {isLoading ? (
        <div className="font-mono text-sm text-ink-700">
          Loading your inventory...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {properties.length > 0 ? (
            properties.map((prop) => (
              <EntityCard
                key={prop.id}
                title={prop.name}
                subtitle={prop.address || "No address specified"}
                code={tagCode("property", prop.id)}
                icon={Home}
                onClick={() => navigate(`/property/${prop.id}`)}
                onEdit={() => openEditModal(prop)}
                onDelete={() => handleDelete(prop.id)}
              />
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-ink-900/15 py-20 text-center">
              <p className="font-sans font-semibold text-ink-900">
                No properties yet
              </p>
              <p className="mt-1 font-sans text-sm text-ink-700">
                Click "Add Property" to get started.
              </p>
            </div>
          )}
        </div>
      )}

      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "create" ? "Add New Property" : "Edit Property"}
        submitText={modalMode === "create" ? "Create Property" : "Save Changes"}
        initialData={selectedProperty}
        fields={[
          {
            name: "name",
            label: "Property Name (e.g., Main House)",
            required: true,
          },
          { name: "address", label: "Address", required: false },
        ]}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
