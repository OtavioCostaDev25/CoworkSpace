import { hasTimeConflict } from './reservation-rules';

describe('hasTimeConflict', () => {
  const date = (hours: number) => new Date(`2026-01-01T${String(hours).padStart(2, '0')}:00:00.000Z`);

  it('detects overlapping intervals', () => {
    expect(hasTimeConflict(date(10), date(12), date(11), date(13))).toBe(true);
  });

  it('allows adjacent reservations', () => {
    expect(hasTimeConflict(date(10), date(12), date(12), date(14))).toBe(false);
  });

  it('allows intervals before an existing reservation', () => {
    expect(hasTimeConflict(date(10), date(12), date(8), date(10))).toBe(false);
  });
});
