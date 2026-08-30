import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  togglePerformanceHighlight, 
  toggleMemoization,
  triggerRender 
} from '../store/calendarSlice';
import { Zap, RefreshCw, Cpu } from 'lucide-react';

export default function PerformancePanel() {
  const dispatch = useDispatch();
  const { performanceHighlight, memoizationEnabled } = useSelector(state => state.calendar);

  return (
    <div className="perf-panel">
      <div className="perf-panel-header">
        <Cpu style={{ color: 'var(--color-primary)', width: '20px', height: '20px' }} />
        <h3 className="perf-panel-title">
          Performance Lab
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Memoization Control */}
        <div className="perf-setting-row">
          <div>
            <div className="perf-setting-label">
              React.memo Cache
              <span 
                className="perf-setting-badge" 
                style={{ 
                  background: memoizationEnabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: memoizationEnabled ? '#34d399' : '#f87171'
                }}
              >
                {memoizationEnabled ? 'ON' : 'OFF'}
              </span>
            </div>
            <p className="perf-setting-desc">
              When ON, cells & cards only re-render if data properties change.
            </p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={memoizationEnabled}
              onChange={() => dispatch(toggleMemoization())}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        {/* Flashing Toggle */}
        <div className="perf-setting-row">
          <div>
            <div className="perf-setting-label">
              Render Highlights
              <span 
                className="perf-setting-badge"
                style={{ 
                  background: performanceHighlight ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  color: performanceHighlight ? '#a5b4fc' : 'var(--text-muted)'
                }}
              >
                {performanceHighlight ? 'ACTIVE' : 'MUTED'}
              </span>
            </div>
            <p className="perf-setting-desc">
              Flashes component cell boundaries green when a render occurs.
            </p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={performanceHighlight}
              onChange={() => dispatch(togglePerformanceHighlight())}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        {/* Manual Render Trigger */}
        <div className="perf-trigger-box">
          <div className="perf-setting-desc" style={{ marginTop: 0 }}>
            <span style={{ fontWeight: 700, display: 'block', color: 'var(--text-primary)' }}>Test Render Lag</span>
            Force global app re-render tree.
          </div>
          <button
            onClick={() => dispatch(triggerRender())}
            className="btn-trigger-render"
            title="Force App Re-render"
          >
            <RefreshCw style={{ width: '14px', height: '14px' }} />
            Trigger
          </button>
        </div>

        {/* Info */}
        <div className="perf-insight-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, marginBottom: '0.25rem', color: '#f59e0b' }}>
            <Zap style={{ width: '14px', height: '14px' }} />
            HCI / Performance Principle
          </div>
          <p>
            Drag & drop posts. With <strong>React.memo ON</strong>, only the cells being modified flash. With <strong>OFF</strong>, the entire grid flashes, demonstrating the overhead of unnecessary updates.
          </p>
        </div>
      </div>
    </div>
  );
}
