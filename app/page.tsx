import Image from 'next/image';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEF2E4',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <Image
        src="/frito-logo.png"
        alt="Frito Paws"
        width={180}
        height={180}
        style={{ marginBottom: '2rem' }}
      />
      <h1
        style={{
          fontFamily: "'Alfa Slab One', serif",
          color: '#143F3F',
          fontSize: '2.5rem',
          marginBottom: '1rem',
        }}
      >
        Something Big Is Coming
      </h1>
      <p
        style={{
          color: '#5BA69E',
          fontSize: '1.2rem',
          maxWidth: '520px',
          lineHeight: 1.7,
          marginBottom: '2rem',
        }}
      >
        We&apos;re evolving from dog walking into something much bigger.
        Meet <strong style={{ color: '#143F3F' }}>PetverseApp</strong> &mdash; your
        pet&apos;s digital universe. One app to manage your pet&apos;s entire life.
      </p>
      <p
        style={{
          color: '#143F3F',
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: '2.5rem',
        }}
      >
        Coming soon. Stay tuned.
      </p>
      <a
        href="mailto:info@fritopaws.com"
        style={{
          display: 'inline-block',
          backgroundColor: '#143F3F',
          color: '#FEF2E4',
          padding: '0.8rem 2rem',
          borderRadius: '2rem',
          textDecoration: 'none',
          fontSize: '1rem',
          fontWeight: 600,
        }}
      >
        Get in Touch
      </a>
    </div>
  );
}
