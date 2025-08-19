
export function LinkifyText({ text }: { text: string }) {
  // Non-global regexes for testing
  const urlTest = /https?:\/\/[^\s]+/;
  const hashtagTest = /#[\w\u0600-\u06FF]+/;

  // Global combined regex with capturing groups so split keeps matches
  const combined = /(https?:\/\/[^\s]+)|(#[\w\u0600-\u06FF]+)/g;

  // Split keeps the matched pieces (because of capturing groups)
  const parts = text.split(combined);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;

        if (urlTest.test(part)) {
          return (
            <a
              key={idx}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline break-all"
            >
              {part}
            </a>
          );
        }

        if (hashtagTest.test(part)) {
          return (
            <a
              key={idx}
              href={`/hashtag/${part.substring(1)}`} // link target: remove '#' for route
              className="text-blue-400 hover:underline"
            >
              {part} {/* we keep the '#' visible as you asked */}
            </a>
          );
        }

        return <span key={idx}>{part}</span>;
      })}
    </>
  );
}
