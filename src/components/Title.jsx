/* eslint-disable react/prop-types */
function Title({ text1, text2 }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2">
      <p className="text-gray-500">
        {text1} <span className="font-medium text-gray-700">{text2}</span>
      </p>
    </div>
  );
}

export default Title;
