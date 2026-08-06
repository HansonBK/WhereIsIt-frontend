import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Plus, Edit2, Trash2 } from "lucide-react";
import api from "../services/api";
import ActionModal from "../components/ActionModal";

export default function ContainerView() {
  const { containerId } = useParams();
  const location = useLocation();
  const { propertyName, propertyId, spaceName, spaceId } = location.state || {};

  const [container, setContainer] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [containerRes, itemsRes] = await Promise.all([
          api.get(`/containers/${containerId}`),
          api.get(`/items/container/${containerId}`),
        ]);
        setContainer(containerRes.data);
        setItems(itemsRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [containerId]);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode("edit");
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await api.delete(`/items/${id}`);
        setItems(items.filter((i) => i.id !== id));
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
      const payload = { ...data, containerId: containerId };
      const res = await api.post("/items", payload);
      setItems([...items, res.data]);
    } else {
      const res = await api.put(`/items/${selectedItem.id}`, data);
      setItems(items.map((i) => (i.id === selectedItem.id ? res.data : i)));
    }
  };

  if (isLoading)
    return <div className="font-mono text-sm text-ink-700">Loading...</div>;
  if (!container)
    return (
      <div className="font-mono text-sm text-clay">Container not found</div>
    );

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
        {spaceName && spaceId && (
          <>
            <Link
              to={`/space/${spaceId}`}
              className="hover:text-brass transition-colors"
            >
              {spaceName}
            </Link>
            <span className="text-ink-500">›</span>
          </>
        )}
        <span className="text-ink-900">{container.name}</span>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink-900">
            {container.name}
          </h2>
          <p className="mt-1 font-mono text-sm tracking-wide text-ink-700">
            {items.length} items
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-lg bg-brass px-4 py-2 font-sans text-sm font-semibold text-white transition hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(168,118,58,0.4)]"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between rounded-xl border border-ink-900/10 bg-white p-4 shadow-sm transition hover:border-brass/30 hover:shadow-card"
          >
            <span className="font-sans font-semibold text-ink-900 pr-4">
              {item.name}
            </span>
            <div className="flex shrink-0">
              <button
                onClick={() => openEditModal(item)}
                className="rounded p-2 text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-brass"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="rounded p-2 text-ink-500 transition-colors hover:bg-clay/10 hover:text-clay"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="rounded-xl border border-dashed border-ink-900/20 py-12 text-center text-sm font-semibold text-ink-500">
            No items in this container yet.
          </div>
        )}
      </div>

      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "create" ? "Add New Item" : "Edit Item"}
        submitText={modalMode === "create" ? "Add Item" : "Save Changes"}
        initialData={selectedItem}
        fields={[
          {
            name: "name",
            label: "Item Name (e.g., Hammer, Ski Boots)",
            required: true,
          },
        ]}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
