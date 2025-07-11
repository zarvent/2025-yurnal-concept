import { arrayMove } from '@dnd-kit/sortable';
import axios from 'axios';
import { produce } from 'immer';
import { debounce } from 'lodash-es';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface Tool {
  id: string;
  name: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

interface ToolsState {
  tools: Tool[];
  activeToolId: string | null;
  status: Status;
  error: string | null;

  setTools: (tools: Tool[]) => void;
  setActiveToolId: (id: string | null) => void;
  moveTool: (activeId: string, overId: string) => void;
  saveToolsOrder: () => void;
}

export const debouncedSave = debounce(async (get: () => ToolsState, set: (state: Partial<ToolsState>) => void) => {
  const { tools } = get();
  const originalTools = [...tools];
  set({ status: 'loading', error: null });

  try {
    const toolOrderIds = tools.map((tool: Tool) => tool.id);
    await axios.post('/api/patient/tools/order', { toolIds: toolOrderIds });
    set({ status: 'success' });
  } catch (err) {
    set({
      status: 'error',
      error: 'Error al guardar el orden. Revirtiendo cambios.',
      tools: originalTools
    });
  } finally {
    setTimeout(() => set({ status: 'idle' }), 2000);
  }
}, 500);

export const useToolsStore = create<ToolsState>()(
  devtools((set, get) => ({
    tools: [],
    activeToolId: null,
    status: 'idle',
    error: null,

    setTools: (tools) => set({ tools, status: 'idle', error: null }),
    setActiveToolId: (id) => set({ activeToolId: id }),

    moveTool: (activeId, overId) =>
      set(
        produce((draft: ToolsState) => {
          const activeIndex = draft.tools.findIndex((t) => t.id === activeId);
          const overIndex = draft.tools.findIndex((t) => t.id === overId);

          if (activeIndex !== -1 && overIndex !== -1) {
            draft.tools = arrayMove(draft.tools, activeIndex, overIndex);
          }
        }),
      ),

    saveToolsOrder: () => {
      debouncedSave(get, set);
    },
  })),
);
