<template>
  <div class="container mx-auto  py-8 max-w-4xl">
    <header class="mb-8">
      <h1 class="text-4xl text-center font-bold text-gray-800">John Doe</h1>
      <p class="text-xl text-center text-gray-600 mb-4">Creative and Innovative Web Developer</p>
      <div class="flex flex-wrap justify-between text-sm text-gray-600 border-t border-b border-gray-300 py-2">
        <span class="mr-4">
          <i class="fas fa-map-marker-alt mr-1"></i> Please antville, CA 94588
        </span>
        <span class="mr-4">
          <i class="fas fa-phone mr-1"></i> (555) 123-4567
        </span>
        <span class="mr-4">
          <i class="fas fa-envelope mr-1"></i> john.doe@gmail.com
        </span>
        <span>
          <i class="fas fa-globe mr-1"></i> https://johndoe.me/
        </span>
      </div>
    </header>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">Profiles</h2>
      <div class="flex space-x-6 place-content-center ">
        <a href="#" class="flex items-center text-blue-600 hover:underline" target="_blank">
          <i class="fab fa-linkedin mr-1"></i> LinkedIn
        </a>
        <a href="https://github.com/sakana9826" class="flex items-center text-blue-600 hover:underline" target="_blank">
          <i class="fab fa-github mr-1"></i> GitHub
        </a>
        <a href="#" class="flex items-center text-blue-600 hover:underline">
          <i class="fab fa-stack-overflow mr-1"></i> StackOverflow
        </a>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">Summary</h2>
      <p class="text-gray-700">
        Innovative Web Developer with 5 years of experience in building impactful and user-friendly websites
        and applications. Specializes in <strong>front-end technologies</strong> and passionate about modern web
        standards and
        cutting-edge development techniques. Proven track record of leading successful projects from concept
        to deployment.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">Experience</h2>
      <div class="mb-4">
        <div class="flex justify-between items-baseline">
          <h3 class="text-xl font-semibold">Creative Solutions Inc.</h3>
          <span class="text-gray-600">January 2019 to Present</span>
        </div>
        <div class="flex justify-between items-baseline">
          <p class="text-lg text-gray-700">Senior Web Developer</p>
          <p class="text-gray-600 mb-2">San Francisco, CA</p>
        </div>
        <a href="https://creativesolutions.inc/" class="text-blue-600 hover:underline">
          <i class="fas fa-link mr-1"></i>https://creativesolutions.inc/
        </a>
        <ul class="list-disc list-inside mt-2">
          <li>Spearheaded the redesign of the main product website, resulting in a 40% increase in user engagement.</li>
          <li>Developed and implemented a new responsive framework, improving cross-device compatibility.</li>
          <li>Mentored a team of four junior developers, fostering a culture of technical excellence.</li>
        </ul>
      </div>
      <!-- Add more experience entries here -->
    </section>

    <!-- Add Education, Projects, Skills, Certifications, and Languages sections here -->

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">References</h2>
      <p>Available upon request</p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2 border-b border-gray-300 pb-1">Education</h2>
      <p>1974，won the championship in my first free boxing match in Southeast Asia</p>
    </section>

    <section class="mb-8">
      <div class="flex space-x-6 place-content-center">
        <button @click="downloadPDF" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          下载简历 PDF
        </button>
        <button @click="" class="bg-gray-500 text-white px-4 py-2 rounded">
          智能一页（开发中）
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const downloadPDF = () => {
  const element = document.querySelector(".container");

  html2canvas(element as HTMLElement, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("resume.pdf");
  });
};
</script>