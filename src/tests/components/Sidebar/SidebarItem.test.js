import { render, screen } from '@testing-library/react';
import SidebarItem from 'components/Sidebar/SidebarItem';

test('renders sample with correct title', () => {
  const mockSample = {
    id: 1,
    audio: 'http://localhost:3000/samples/Bass.mp3',
    title: 'Sample Test Title',
  }
  render(<SidebarItem sample={mockSample} />);
  const innerText = screen.getByText(/Sample Test Title/i);
  expect(innerText).toBeInTheDocument();
});


