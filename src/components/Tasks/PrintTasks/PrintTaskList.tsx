import React from 'react';
import { Printer, CheckCircle, Clock } from 'lucide-react';
import { usePrintTaskStore } from '../../../store/printTaskStore';

export function PrintTaskList() {
  const { printTasks, updatePrintTaskStatus } = usePrintTaskStore();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-[#8b8585] mb-6">Print Tasks</h2>
      
      {printTasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-lg border p-4 hover:shadow-md transition-all"
          style={{ borderColor: "#cec4c1" }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Printer className="text-[#b48f8f]" size={20} />
              <h3 className="font-medium text-[#8b8585]">{task.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              {task.completed ? (
                <span className="flex items-center gap-1 text-green-500">
                  <CheckCircle size={16} />
                  <span className="text-sm">Completed</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[#b48f8f]">
                  <Clock size={16} />
                  <span className="text-sm">Pending</span>
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                {task.materialType}
              </span>
              {task.quantity && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                  Quantity: {task.quantity}
                </span>
              )}
            </div>
            {task.notes && (
              <p className="text-sm text-[#737373]">{task.notes}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#737373]">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
            {!task.completed && (
              <button
                onClick={() => updatePrintTaskStatus(task.id, true)}
                className="text-sm text-[#b48f8f] hover:underline"
              >
                Mark as Complete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}