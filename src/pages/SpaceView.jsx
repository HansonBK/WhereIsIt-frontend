import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Plus, Package } from "lucide-react";
import api from "../services/api";
import EntityCard from "../components/EntityCard";
import ActionModal from "../components/ActionModal";

export default function SpaceView() {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { propertyName, propertyId } = location.state || {};

  const [space, setSpace] = useState(null);
  const [containers, setContainers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedContainer, setSelectedContainer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [spaceRes, containersRes] = await Promise.all([
          api.get(`/spaces/${spaceId}`),
          api.get(`/containers/space/${spaceId}`),
        ]);
        setSpace(spaceRes.data);
        setContainers(containersRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [spaceId]);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedContainer(null);
    setIsModalOpen(true);
  };

  const openEditModal = (container) => {
    setModalMode("edit");
    setSelectedContainer(container);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this container? All items inside will be lost.",
      )
    ) {
      try {
        await api.delete(`/containers/${id}`);
        setContainers(containers.filter((c) => c.id !== id));
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
      const payload = { ...data, spaceId: spaceId };
      const res = await api.post("/containers", payload);
      setContainers([...containers, res.data]);
    } else {
      const res = await api.put(`/containers/${selectedContainer.id}`, data);
      setContainers(
        containers.map((c) => (c.id === selectedContainer.id ? res.data : c)),
      );
    }
  };

  if (isLoading)
    return <div className="font-mono text-sm text-ink-700">Loading...</div>;
  if (!space)
    return <div className="font-mono text-sm text-clay">Space not found</div>;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6 flex items-center gap-2 font-mono text-xs font-semibold text-ink-700">
        <Link to="/dashboard" className="hover:text-brass transition-colors">
          Dashboard
        </Link>
        <span className="text-ink-500">›</span>
        {propertyName && propertyId && (
          <>
            <Link
              to={`/property/${propertyId}`}
              className="hover:text-brass transition-colors"
            >
              {propertyName}
            </Link>
            <span className="text-ink-500">›</span>
          </>
        )}
        <span className="text-ink-900">{space.name}</span>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink-900">
            {space.name}
          </h2>
          <p className="mt-1 font-mono text-sm tracking-wide text-ink-700">
            {containers.length} containers
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-lg bg-brass px-4 py-2 font-sans text-sm font-semibold text-white transition hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(168,118,58,0.4)]"
        >
          <Plus size={18} />
          Add Container
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {containers.map((container) => (
          <EntityCard
            key={container.id}
            title={container.name}
            subtitle="Container"
            icon={Package}
            onClick={() =>
              navigate(`/container/${container.id}`, {
                state: {
                  propertyName: propertyName,
                  propertyId: propertyId,
                  spaceName: space.name,
                  spaceId: space.id,
                },
              })
            }
            onEdit={() => openEditModal(container)}
            onDelete={() => handleDelete(container.id)}
          />
        ))}
      </div>

      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "create" ? "Add New Container" : "Edit Container"}
        submitText={
          modalMode === "create" ? "Create Container" : "Save Changes"
        }
        initialData={selectedContainer}
        fields={[
          {
            name: "name",
            label: "Container Name (e.g., Red Toolbox)",
            required: true,
          },
        ]}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
