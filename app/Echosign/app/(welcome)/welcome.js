import React from 'react';
import { Text , View, Image , StyleSheet } from 'react-native';
import Svg, { Path } from "react-native-svg";

export default function welcome() {
  return (
    <View className="flex-1 items-center justify-center">
        <Svg width="430" height="932" viewBox="0 0 430 932" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M549.188 974.986C583.472 1004.4 616.854 1032.36 649.158 1061.16C656.65 1067.91 662.438 1076.67 666.005 1086.03C680.021 1122.63 693.682 1159.45 705.713 1197.01C708.651 1206.14 707.297 1218.27 703.584 1228.97C701.358 1235.51 691.134 1245.42 683.979 1247.56C678.175 1249.31 668.393 1243.63 665.961 1238.3C652.594 1208.92 641.578 1178.17 628.566 1148.56C601.977 1088.04 543.696 1053.41 487.105 1017.73C483.467 1015.43 472.071 1020.46 464.461 1023.06C371.069 1055.13 276.511 1092.48 187.031 1081.16C136.779 1074.83 87.6799 1064.2 43.0272 1048.64C1.44542 1034.07 3.92266 985.174 39.1236 943.281C81.6956 892.63 129.041 866.607 194.535 865.174C294.234 862.999 379.969 881.188 453.751 921.209C498.74 945.669 527.435 935.813 562.125 882.154C593.471 833.627 587.55 794.212 563.285 759.131C522.78 700.556 460.414 664.686 381.454 641.347C320.612 720.713 239.139 761.525 148.886 780.974C48.0872 802.652 -24.4116 775.845 -75.8012 720.146C-104.498 689.03 -78.086 630.332 -29.4897 597.582C55.3857 540.396 136.956 518.434 219.607 533.625C270.664 543.041 320.141 555.273 370.717 566.3C460.333 444.986 401.444 286.061 248.898 229.584C211.907 268.382 180.115 310.619 138.891 343.364C41.9751 420.249 -152.766 482.654 -269.5 425.844C-306.386 407.931 -335.177 382.827 -337.659 341.024C-338.366 328.941 -331.117 312.029 -321.651 299.699C-255.239 213.039 -69.3303 130.179 32.926 136.317C92.2971 139.894 155.114 135.126 219.128 134.083C265.277 53.8176 145.671 -93.7577 -2.25995 -100.207C-10.3132 -86.3871 -15.6081 -69.894 -27.6362 -57.7321C-119.991 35.6821 -222.487 112.689 -354.811 123.734C-406.114 128.039 -443.352 107.368 -467.288 76.1984C-492.419 43.4919 -456.846 -23.0571 -390.466 -58.6563C-334.045 -88.8884 -273.616 -113.63 -214.157 -132.783C-161.074 -149.92 -106.836 -156.04 -48.2649 -168.077C-41.7001 -204.791 -38.4496 -247.86 -57.0815 -286.16C-95.0288 -364.263 -169.598 -409.138 -256.733 -440.731C-307.436 -459.122 -365.523 -467.782 -421.562 -478.498C-437.585 -481.551 -458.059 -476.689 -478.537 -475.414C-480.019 -483.778 -481.597 -492.696 -483.531 -503.582C-425.529 -532.252 -371.685 -531.649 -325.887 -520.996C-194.797 -490.481 -77.7013 -442.036 -9.82082 -342.948C16.4401 -304.636 28.8789 -258.656 18.375 -204.449C13.7789 -180.859 14.4338 -163.491 48.9507 -156.372C186.033 -127.896 319.279 -11.9523 276.733 147.332C273.497 159.4 286.502 174.475 298.42 181.029C359.694 214.335 412.977 253.806 443.298 312.81C480.159 384.581 483.648 464.808 440.803 555.988C429.692 579.578 430.274 590.862 453.815 601.702C505.618 625.453 554.802 652.923 599.654 684.123C660.2 726.196 667.261 853.769 592.271 933.912C578.962 948.178 563.579 961.276 549.149 974.922L549.188 974.986ZM190.261 209.095C176.087 206.648 165.07 203.739 153.167 202.779C92.846 197.863 33.9184 187.445 -28.6645 190.405C-115.451 194.579 -191.706 245.824 -261.394 303.517C-292.841 329.607 -288.512 354.51 -257.67 368.015C-191.803 396.82 -116.495 398.339 -30.9587 370.862C61.0424 341.314 144.085 300.057 190.221 209.031L190.261 209.095ZM336.017 620.14C286.49 608.027 241.703 596.223 195.873 586.115C131.294 571.923 63.6979 592.428 -2.41114 631.449C-36.6415 651.643 -40.6051 672.478 -20.7847 693.409C4.48114 720.167 42.1799 730.048 86.8258 728.894C175.989 726.577 260.082 702.531 336.106 620.085L336.017 620.14ZM-66.1182 -105.476C-137.857 -102.81 -210.121 -94.8293 -282.703 -60.9123C-324.086 -41.551 -363.795 -14.907 -401.739 11.6091C-423.459 26.7846 -418.144 42.147 -399.842 49.4833C-367.381 62.4261 -332.305 68.0625 -288.811 55.1006C-235.063 39.0402 -186.689 12.2946 -141.278 -22.4263C-111.037 -45.4947 -78.1624 -66.6893 -66.1182 -105.476ZM416.896 985.486C417.177 982.16 417.329 978.827 417.609 975.502C350.744 933.745 245.677 914.11 153.249 926.061C127.42 929.418 69.6087 966.55 73.9383 979.721C78.9407 994.576 96.8705 1008.27 115.182 1011.05C161.409 1018.02 209.718 1024.58 259.662 1020.07C310.463 1015.55 364.367 997.553 416.896 985.486Z" fill="#1AA6B7" opacity="0.1"/>
        </Svg>

      <View className="absolute items-center justify-center h-[9%] w-full ">
        <Image
        className="h-full w-full "
        source={require('../assets/Logo_EcoSign_final.png')}
        resizeMode='contain'
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  //...
});